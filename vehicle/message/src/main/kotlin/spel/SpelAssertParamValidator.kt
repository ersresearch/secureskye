/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.spel

import org.hibernate.validator.internal.engine.constraintvalidation.ConstraintValidatorContextImpl
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
 *
 */
@SupportedValidationTarget(ValidationTarget.PARAMETERS)
class SpelAssertParamValidator : ConstraintValidator<SpelAssertParam, Array<Any>> {
    private val parser = SpelExpressionParser(SpelParserConfiguration(SpelCompilerMode.MIXED, null))
    private var parsedExpression: Expression? = null

    /**
     * [ConstraintValidator.initialize].
     */
    override fun initialize(constraintAnnotation: SpelAssertParam) {
        parsedExpression = parser.parseExpression(constraintAnnotation.value)
    }

    /**
     * [ConstraintValidator.isValid].
     */
    override fun isValid(value: Array<Any>, context: ConstraintValidatorContext): Boolean {
        context as ConstraintValidatorContextImpl
        val paramNames = context.methodParameterNames
        val spelContext = StandardEvaluationContext(value)
        val spelVars = value.mapIndexed { i, v -> paramNames[i] to v }.toMap()
        spelContext.setVariables(spelVars)
        return parsedExpression?.getValue(spelContext) as Boolean? ?: false
    }
}
