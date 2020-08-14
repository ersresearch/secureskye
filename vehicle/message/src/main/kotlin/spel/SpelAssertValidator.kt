/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.spel

import org.springframework.expression.Expression
import org.springframework.expression.spel.SpelCompilerMode
import org.springframework.expression.spel.SpelParserConfiguration
import org.springframework.expression.spel.standard.SpelExpressionParser
import org.springframework.expression.spel.support.StandardEvaluationContext
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext
import javax.validation.constraintvalidation.SupportedValidationTarget
import javax.validation.constraintvalidation.ValidationTarget

/**
 * A validator for checking a specific method parameter with a SpEL.
 */
@SupportedValidationTarget(ValidationTarget.ANNOTATED_ELEMENT)
class SpelAssertValidator : ConstraintValidator<SpelAssert, Any> {
    private val parser = SpelExpressionParser(SpelParserConfiguration(SpelCompilerMode.MIXED, null))
    private var parsedExpression: Expression? = null

    /**
     * [ConstraintValidator.initialize].
     */
    override fun initialize(constraintAnnotation: SpelAssert) {
        parsedExpression = parser.parseExpression(constraintAnnotation.value)
    }

    /**
     * [ConstraintValidator.isValid].
     */
    override fun isValid(value: Any, context: ConstraintValidatorContext): Boolean {
        val spelContext = StandardEvaluationContext(value)
        spelContext.setVariable("this", value)
        return parsedExpression?.getValue(spelContext) as Boolean? ?: false
    }
}
