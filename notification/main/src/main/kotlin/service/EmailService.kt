/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.notification.main.service

import com.mongodb.client.gridfs.GridFSBucket
import com.mongodb.client.gridfs.model.GridFSUploadOptions
import jp.co.trillium.secureskye.common.util.Timestamps
import jp.co.trillium.secureskye.notification.main.feign.UserAdminClient
import jp.co.trillium.secureskye.notification.main.model.Notification
import org.bson.Document
import org.springframework.boot.autoconfigure.mail.MailProperties
import org.springframework.data.mongodb.core.convert.MongoConverter
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.mail.javamail.MimeMessageHelper
import org.springframework.stereotype.Service
import javax.mail.internet.InternetAddress
import javax.mail.internet.MimeMessage

/**
 * Service for sending notifications by email.
 */
@Service
class EmailService(
    private val userAdminClient: UserAdminClient,
    private val javaMailSender: JavaMailSender,
    private val gridFsBucket: GridFSBucket,
    private val mongoConverter: MongoConverter,
    private val mailProperties: MailProperties
) {

    /**
     * Send an email [notification] to all users.
     */
    fun notify(notification: Notification) {
        val users = userAdminClient.listUsers()
        val mail = javaMailSender.createMimeMessage()
            .prepare(notification.subject, notification.message)

        for (user in users.dataList) {
            mail.setTo(InternetAddress(user.email, "${user.firstName} ${user.lastName}"))
            javaMailSender.send(mail.mimeMessage)
            saveEmail(notification, mail.mimeMessage)
        }
    }

    /**
     * Send an email [notification] to a single user.
     */
    fun send(notification: Notification) {
        val user = userAdminClient.get(notification.recipient)
        val mail = javaMailSender.createMimeMessage()
            .prepare(notification.subject, notification.message)
        mail.setTo(InternetAddress(user.email, "${user.firstName} ${user.lastName}"))
        javaMailSender.send(mail.mimeMessage)
        saveEmail(notification, mail.mimeMessage)
    }

    /**
     * Store the [mimeMessage] in the database for later reference together with the [notification].
     */
    private fun saveEmail(notification: Notification, mimeMessage: MimeMessage) {
        val metadata = Document()
        mongoConverter.write(notification, metadata)

        val options = GridFSUploadOptions().apply {
            metadata(metadata)
        }

        gridFsBucket.openUploadStream("${Timestamps.now()}-email", options).use {
            mimeMessage.writeTo(it)
        }
    }

    /**
     * Prepare the [MimeMessage] with usual information.
     */
    private fun MimeMessage.prepare(subject: String, message: String) =
        MimeMessageHelper(this).apply {
            setSubject(subject)
            setText(message)

            val displayName = mailProperties.properties["display-name"].orEmpty()
            val from = mailProperties.properties["mail.smtp.from"].orEmpty()

            if (displayName.isNotBlank() && from.isNotBlank()) {
                setFrom(from, displayName)
                setReplyTo(from, displayName)
            }
        }
}
