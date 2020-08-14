/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.common.extension

import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.Path

/**
 *  buildLikeExpression.
 */
fun CriteriaBuilder.buildLikeExpression(path: Path<String>, value: String) =
    like(upper(path), "%${value.trim().toUpperCase()}%")
