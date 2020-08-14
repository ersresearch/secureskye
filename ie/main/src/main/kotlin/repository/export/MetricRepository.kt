/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.ie.main.repository.export

import jp.co.trillium.secureskye.ie.main.model.export.Metric
import org.springframework.data.jpa.repository.JpaRepository
import java.util.UUID

/**
 * Repository for managing [Metric] entities.
 */
interface MetricRepository : JpaRepository<Metric, UUID>
