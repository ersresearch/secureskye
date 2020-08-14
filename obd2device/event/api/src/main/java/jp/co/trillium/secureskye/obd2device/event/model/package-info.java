/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
@TypeDefs(
        @TypeDef(name = "uuid", typeClass = PostgresUUIDType.class, defaultForType = UUID.class)
)
@GenericGenerators(
        @GenericGenerator(name = "custom-uuid",
                strategy = "org.hibernate.id.UUIDGenerator",
                parameters = @Parameter(
                        name = "uuid_gen_strategy_class",
                        value = "jp.co.trillium.secureskye.common.jpa.TimedUuidGenerationStrategy"))
)
package jp.co.trillium.secureskye.obd2device.event.model;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.GenericGenerators;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.TypeDef;
import org.hibernate.annotations.TypeDefs;
import org.hibernate.type.PostgresUUIDType;

import java.util.UUID;
