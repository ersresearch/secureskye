/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.user.settings.mapper

import jp.co.trillium.secureskye.common.mapper.UuidMapper
import jp.co.trillium.secureskye.user.settings.model.LengthUnit
import jp.co.trillium.secureskye.user.settings.model.LengthUnitDto
import jp.co.trillium.secureskye.user.settings.model.MassUnit
import jp.co.trillium.secureskye.user.settings.model.MassUnitDto
import jp.co.trillium.secureskye.user.settings.model.TemperatureUnit
import jp.co.trillium.secureskye.user.settings.model.TemperatureUnitDto
import jp.co.trillium.secureskye.user.settings.model.UnitSettings
import jp.co.trillium.secureskye.user.settings.model.UnitSettingsDto
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.test.context.junit.jupiter.SpringExtension
import java.util.UUID

@ExtendWith(SpringExtension::class)
class EventMapperTest {

    @TestConfiguration
    @ComponentScan(basePackageClasses = [UnitSettingsMapper::class, UuidMapper::class])
    class TestContextConfiguration

    @Autowired
    private lateinit var mapper: UnitSettingsMapper

    @Test
    fun `Unit settings should be same after mapping`() {
        val settings = UnitSettings(
            id = UUID.randomUUID(),
            length = LengthUnit.Kilometers,
            mass = MassUnit.Kilograms,
            temperature = TemperatureUnit.Celsius
        )

        val temp = mapper.settings(settings)
        val mapped = mapper.settings(settings.id, temp)

        assertThat(mapped).isEqualTo(settings)
    }

    @Test
    fun `Unit settings DTO should be same after mapping`() {
        val settings = UnitSettingsDto(
            length = LengthUnitDto.Miles,
            mass = MassUnitDto.Pounds,
            temperature = TemperatureUnitDto.Fahrenheit
        )

        val temp = mapper.settings(UUID.randomUUID(), settings)
        val mapped = mapper.settings(temp)

        assertThat(mapped).isEqualTo(settings)
    }

    @Test
    fun `Unit settings should be updated with source DTO`() {
        val source = UnitSettingsDto(
            length = LengthUnitDto.Miles,
            mass = MassUnitDto.Pounds,
            temperature = TemperatureUnitDto.Fahrenheit
        )
        val target = UnitSettings(
            id = UUID.randomUUID(),
            length = LengthUnit.Kilometers,
            mass = MassUnit.Kilograms,
            temperature = TemperatureUnit.Celsius
        )

        mapper.update(source, target)

        assertThat(target.length).isEqualTo(LengthUnit.Miles)
        assertThat(target.mass).isEqualTo(MassUnit.Pounds)
        assertThat(target.temperature).isEqualTo(TemperatureUnit.Fahrenheit)
    }

    @Test
    fun `Unit settings should NOT be updated with empty source DTO`() {
        val source = UnitSettingsDto()
        val target = UnitSettings(
            id = UUID.randomUUID(),
            length = LengthUnit.Miles,
            mass = MassUnit.Pounds,
            temperature = TemperatureUnit.Fahrenheit
        )
        val targetCopy = target.copy()

        mapper.update(source, targetCopy)

        assertThat(targetCopy).isEqualTo(target)
    }
}
