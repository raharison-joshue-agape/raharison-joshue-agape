import { cn } from "@/lib/utils"
import { Switch } from "../ui/switch"
import { useState } from "react"

export default function NotificationSetting() {
    const [emailNotif, setEmailNotif] = useState(false)
    const [securityAlert, setSecurityAlert] = useState(false)
    const [clientMessage, setClientMessage] = useState(false)
    return (
        <div
            className={cn(
                "space-y-6 rounded-lg border border-border p-6 shadow-sm",
                "bg-gray-900/30"
            )}
        >
            <div>
                <h2 className={cn("text-lg font-semibold", "text-slate-100")}>
                    Préférences de Notification
                </h2>
                <p className={cn("text-xs", "text-slate-400")}>
                    Choisissez comment et quand vous souhaitez être alerté.
                </p>
            </div>

            <div className={cn("space-y-4 divide-y divide-border")}>
                <div
                    className={cn(
                        "flex items-center justify-between pt-4 first:pt-0"
                    )}
                >
                    <div>
                        <p
                            className={cn(
                                "text-sm font-medium",
                                "text-slate-100"
                            )}
                        >
                            Notifications par email
                        </p>
                        <p className={cn("text-xs", "text-slate-400")}>
                            Recevoir un résumé des activités importantes par
                            e-mail.
                        </p>
                    </div>
                    <Switch
                        id="email-notif"
                        checked={emailNotif}
                        onCheckedChange={(v) => setEmailNotif(v)}
                    />
                </div>

                <div className={cn("flex items-center justify-between pt-4")}>
                    <div>
                        <p
                            className={cn(
                                "text-sm font-medium",
                                "text-slate-100"
                            )}
                        >
                            Alertes de sécurité
                        </p>
                        <p className={cn("text-xs", "text-slate-400")}>
                            Être averti en cas de connexion suspecte ou
                            modification du mot de passe.
                        </p>
                    </div>
                    <Switch
                        id="security-alert"
                        checked={securityAlert}
                        onCheckedChange={(v) => setSecurityAlert(v)}
                    />
                </div>

                <div className={cn("flex items-center justify-between pt-4")}>
                    <div>
                        <p
                            className={cn(
                                "text-sm font-medium",
                                "text-slate-100"
                            )}
                        >
                            Messages clients
                        </p>
                        <p className={cn("text-xs", "text-slate-400")}>
                            Notification immédiate lorsqu'un client vous envoie
                            un message.
                        </p>
                    </div>
                    <Switch
                        id="client-message"
                        checked={clientMessage}
                        onCheckedChange={(v) => setClientMessage(v)}
                    />
                </div>
            </div>
        </div>
    )
}
