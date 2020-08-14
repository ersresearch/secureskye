/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package plugins

import kotlin.reflect.KClass

class PluginMissingException(cls: KClass<*>, id: String) :
    Exception("${cls.simpleName} ($id) must be applied first")
