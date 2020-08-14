/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.rest

import jp.co.trillium.secureskye.oauth.uaa.helper.AuthorityPropertyEditor
import jp.co.trillium.secureskye.oauth.uaa.helper.SplitCollectionEditor
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.oauth2.provider.ClientDetails
import org.springframework.security.oauth2.provider.client.BaseClientDetails
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.WebDataBinder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.InitBinder
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam

/**
 * Controller for client authority management.
 */
@Controller
@RequestMapping("/clients")
class AuthorityController(private val clientDetailsService: JdbcClientDetailsService) {

    /**
     * Register some custom editor.
     */
    @InitBinder
    fun initBinder(binder: WebDataBinder) {
        // This is mainly needed for the GrantedAuthority array. If we don't use this editor no authorities
        // will get bound to [null] instead of [].
        binder.registerCustomEditor(Collection::class.java, SplitCollectionEditor(Set::class.java, ","))
        // To convert and display roles as strings we use this editor.
        binder.registerCustomEditor(GrantedAuthority::class.java, AuthorityPropertyEditor())
    }

    /**
     * Display an edit/create form for a client.
     *
     * With the [clientId] specified a form for editing the client will be displayed. If it is null, a create form will
     * be displayed instead.
     */
    @GetMapping("/form")
    @PreAuthorize(
        "hasAuthority('uaa:create') and hasAuthority('uaa:read') and " +
                "hasAuthority('uaa:update') and hasAuthority('uaa:delete')"
    )
    fun showEditOrAddForm(@RequestParam(value = "client", required = false) clientId: String?, model: Model): String {
        val clientDetails: ClientDetails = if (clientId != null) {
            clientDetailsService.loadClientByClientId(clientId)
        } else {
            BaseClientDetails()
        }
        model.addAttribute("clientDetails", clientDetails)
        return "clients/form"
    }

    /**
     * Create/update a client from the form.
     *
     * An existing client is is updated if [newClient] is empty, otherwise a new one will be created. Using the
     * [clientDetails] to create/update the client. In the end the user will be redirected to the root.
     */
    @PostMapping("/edit")
    @PreAuthorize(
        "hasAuthority('uaa:create') and hasAuthority('uaa:read') and " +
                "hasAuthority('uaa:update') and hasAuthority('uaa:delete')"
    )
    fun editClient(
        @ModelAttribute clientDetails: BaseClientDetails,
        @RequestParam(value = "newClient", required = false) newClient: String?
    ): String {
        if (newClient == null) {
            // does not update the secret here
            // Confirm: do we delete existing token & approvals info while updating client info
            clientDetailsService.updateClientDetails(clientDetails)
        } else {
            clientDetailsService.addClientDetails(clientDetails)
        }

        // If the user has entered a secret in the form update it.
        if (!clientDetails.clientSecret.isEmpty()) {
            clientDetailsService.updateClientSecret(clientDetails.clientId, clientDetails.clientSecret)
        }
        return "redirect:/"
    }
}
