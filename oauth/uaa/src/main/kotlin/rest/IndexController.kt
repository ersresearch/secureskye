/*
 * Copyright (C) 2017-2018 Trillium Inc. <support@trilliumsecure.com>
 */
package jp.co.trillium.secureskye.oauth.uaa.rest

import org.springframework.security.oauth2.provider.approval.Approval
import org.springframework.security.oauth2.provider.approval.ApprovalStore
import org.springframework.security.oauth2.provider.client.JdbcClientDetailsService
import org.springframework.security.oauth2.provider.token.TokenStore
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.ModelAttribute
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.servlet.ModelAndView
import java.security.Principal
import java.util.Arrays.asList

/**
 * Main controller.
 */
@Controller
class IndexController(
    private val clientDetailsService: JdbcClientDetailsService,
    private val approvalStore: ApprovalStore,
    private val tokenStore: TokenStore
) {

    /**
     * Index.
     */
    @GetMapping("/")
    fun index(model: MutableMap<String, Any>, principal: Principal): ModelAndView {
        val approvals = clientDetailsService.listClientDetails()
            .flatMap { approvalStore.getApprovals(principal.name, it.clientId) }

        model["approvals"] = approvals
        model["clientDetails"] = clientDetailsService.listClientDetails()

        return ModelAndView("index", model)
    }

    /**
     * Revoke approval.
     */
    @PostMapping("/approval/revoke")
    fun revokeApproval(@ModelAttribute approval: Approval): String {
        approvalStore.revokeApprovals(asList<Approval>(approval))
        for (token in tokenStore.findTokensByClientIdAndUserName(approval.clientId, approval.userId))
            tokenStore.removeAccessToken(token)

        return "redirect:/"
    }

    /**
     * Login.
     */
    @GetMapping("/login")
    fun loginPage() = "login"
}
