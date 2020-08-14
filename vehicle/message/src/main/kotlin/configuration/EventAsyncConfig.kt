/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.vehicle.message.configuration

import mu.KLogging
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.AsyncConfigurer
import org.springframework.scheduling.annotation.EnableAsync
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor
import java.lang.reflect.Method
import java.util.concurrent.Executor

/**
 * Thread pool configuration.
 */
@Configuration
@EnableAsync
class EventAsyncConfig : AsyncConfigurer {
    companion object {
        /**
         * Process device data executor.
         */
        private const val PROCESS_DEVICE_DATA_EXECUTOR = "processDeviceDataExecutor"

        /**
         *  Core pool size configuration.
         */
        private const val CORE_POOL_SIZE = 100
    }

    /**
     * Default async executor.
     */
    override fun getAsyncExecutor(): Executor? {
        val executor = ThreadPoolTaskExecutor()
        executor.corePoolSize = CORE_POOL_SIZE
        executor.maxPoolSize = Int.MAX_VALUE
        executor.setQueueCapacity(Int.MAX_VALUE)
        executor.setThreadNamePrefix("Async process - ")
        executor.initialize()
        return executor
    }

    /**
     * Exception handler.
     */
    override fun getAsyncUncaughtExceptionHandler(): AsyncUncaughtExceptionHandler? {
        return AsyncExceptionHandler()
    }

    /**
     * Process device data executor.
     */
    @Bean(EventAsyncConfig.PROCESS_DEVICE_DATA_EXECUTOR)
    fun processDeviceDataExecutor(): Executor {
        val executor = ThreadPoolTaskExecutor()
        executor.corePoolSize = CORE_POOL_SIZE
        executor.maxPoolSize = Int.MAX_VALUE
        executor.setQueueCapacity(Int.MAX_VALUE)
        executor.setThreadNamePrefix("Async " + EventAsyncConfig.PROCESS_DEVICE_DATA_EXECUTOR + " process - ")
        executor.initialize()
        return executor
    }
}

/**
 * Define exception handler.
 */
class AsyncExceptionHandler : AsyncUncaughtExceptionHandler {
    private companion object : KLogging()

    /**
     * Handle uncaught exception.
     * @param ex
     * @param method
     * @param params
     */
    override fun handleUncaughtException(ex: Throwable, method: Method, vararg params: Any?) {
        logger.error("Exception message - ", ex)
        logger.error("Exception message - " + ex.message)
        logger.error("Method name - " + method.name)
        params.forEach { logger.error("Parameter value - $it") }
    }
}
