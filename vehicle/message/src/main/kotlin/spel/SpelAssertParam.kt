/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.spel

import javax.validation.Constraint
import javax.validation.Payload
import kotlin.reflect.KClass

/**
 * An assertion that takes a SpEL to validate any of the parameters of a method.
 *
 * @see SpelAssertParamValidator
 *
 * @property value The SpEL to apply.
 * @property message The message for the exception to return, in case the validation fails.
 */
@Constraint(validatedBy = [SpelAssertParamValidator::class])
@Target(AnnotationTarget.FUNCTION, AnnotationTarget.CONSTRUCTOR)
@Retention(AnnotationRetention.RUNTIME)
@MustBeDocumented
annotation class SpelAssertParam(
    val value: String,
    val message: String = "{spel.assert.param.validation.message}",
    val groups: Array<KClass<*>> = [],
    val payload: Array<KClass<out Payload>> = []
)
