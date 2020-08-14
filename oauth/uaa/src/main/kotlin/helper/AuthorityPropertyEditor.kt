/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.helper

import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import java.awt.Graphics
import java.awt.Rectangle
import java.beans.PropertyChangeListener
import java.beans.PropertyEditor

/**
 * Used to bind Strings to a [org.springframework.security.core.GrantedAuthority] when adding/editing a client.
 *
 * Only implements [.getAsText] and [.setAsText].
 * Refer to [https://github.com/FrontierPsychiatrist/spring-oauth-example]
 */
class AuthorityPropertyEditor : PropertyEditor {

    /**
     * Granted authority info.
     */
    private var _grantedAuthority: GrantedAuthority? = null

    /**
     * [PropertyEditor.setValue].
     */
    override fun setValue(value: Any) {
        this._grantedAuthority = value as GrantedAuthority
    }

    /**
     * [PropertyEditor.getValue].
     */
    override fun getValue() = _grantedAuthority

    /**
     * [PropertyEditor.isPaintable].
     */
    override fun isPaintable() = false

    /**
     * [PropertyEditor.paintValue].
     */
    override fun paintValue(gfx: Graphics, box: Rectangle) {
    }

    /**
     * [PropertyEditor.getJavaInitializationString].
     */
    override fun getJavaInitializationString() = null

    /**
     * [PropertyEditor.getAsText].
     */
    override fun getAsText(): String? = _grantedAuthority?.authority

    /**
     * [PropertyEditor.setAsText].
     */
    override fun setAsText(text: String?) {
        if (text != null && !text.isEmpty()) {
            this._grantedAuthority = SimpleGrantedAuthority(text)
        }
    }

    /**
     * [PropertyEditor.getTags].
     */
    override fun getTags() = null

    /**
     * [PropertyEditor.getCustomEditor].
     */
    override fun getCustomEditor() = null

    /**
     * [PropertyEditor.supportsCustomEditor].
     */
    override fun supportsCustomEditor() = false

    /**
     * [PropertyEditor.addPropertyChangeListener].
     */
    override fun addPropertyChangeListener(listener: PropertyChangeListener) {
    }

    /**
     * [PropertyEditor.removePropertyChangeListener].
     */
    override fun removePropertyChangeListener(listener: PropertyChangeListener) {
    }
}
