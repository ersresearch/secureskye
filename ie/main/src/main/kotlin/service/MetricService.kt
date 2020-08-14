/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.service

import jp.co.trillium.secureskye.ie.main.model.export.Metric
import jp.co.trillium.secureskye.ie.main.repository.export.MetricRepository
import org.springframework.stereotype.Service

/**
 * Business logic for [Metric]s.
 */
@Service
class MetricService(private val metricRepository: MetricRepository) {

    /**
     * Save the [data] to the database.
     */
    fun save(data: Metric) {
        metricRepository.save(data)
    }
}
