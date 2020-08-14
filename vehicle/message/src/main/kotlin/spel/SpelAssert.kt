/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.spel

import javax.validation.Constraint
import javax.validation.Payload
import kotlin.reflect.KClass

/**
 * An assertion that takes a SpEL to validate a single parameter of a method.
 *
 * @see SpelAssertValidator
 *
 * @property value The SpEL to apply.
 * @property message The message for the exception to return, in case the validation fails.
 */
@Constraint(validatedBy = [SpelAssertValidator::class])
@Target(AnnotationTarget.VALUE_PARAMETER)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
annotation class SpelAssert(
    val value: String,
    val message: String = "{spel.assert.validation.message}",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)
