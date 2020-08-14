/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.helper

import org.springframework.beans.propertyeditors.CustomCollectionEditor

/**
 * Creates collections from a string.
 * If the string is empty or null, return an empty collection. Otherwise split by the given splitRegex and use the
 * array.
 *
 * Refer to [https://github.com/FrontierPsychiatrist/spring-oauth-example]
 */
class SplitCollectionEditor(
    private val collectionType: Class<out Collection<*>>,
    private val splitRegex: String
) : CustomCollectionEditor(collectionType, true) {

    /**
     * [CustomCollectionEditor.setAsText].
     */
    override fun setAsText(text: String) {
        if (text.isEmpty()) {
            super.setValue(super.createCollection(this.collectionType, 0))
        } else {
            super.setValue(text.split(splitRegex))
        }
    }
}
