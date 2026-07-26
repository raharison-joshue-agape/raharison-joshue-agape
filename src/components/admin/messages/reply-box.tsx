import { Mail, Sparkles, UserPlus, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ReplyMode } from "./types"

interface ReplyBoxProps {
    mode: ReplyMode
    setMode: (mode: ReplyMode) => void
    replyText: string
    setReplyText: (text: string) => void
    customInviteNote: string
    setCustomInviteNote: (note: string) => void
    email: string
    onSend: () => void
}

export function ReplyBox({
    mode,
    setMode,
    replyText,
    setReplyText,
    customInviteNote,
    setCustomInviteNote,
    email,
    onSend,
}: ReplyBoxProps) {
    const isDisabled =
        mode === "message" ? !replyText.trim() : !customInviteNote.trim()

    return (
        <div
            className={cn(
                "sticky bottom-0 z-20 space-y-3 border-t p-3 backdrop-blur-3xl",
                "border-gray-800 bg-gray-900/50"
            )}
        >
            <div className={cn("flex items-center justify-between")}>
                <div
                    className={cn(
                        "flex gap-1 rounded-lg border p-1",
                        "border-gray-800 bg-gray-950"
                    )}
                >
                    <button
                        type="button"
                        onClick={() => setMode("message")}
                        className={cn(
                            "flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-medium transition-colors",
                            mode === "message"
                                ? "bg-gray-800 text-white"
                                : "text-slate-400 hover:text-white"
                        )}
                    >
                        <Mail size={12} />
                        Réponse simple
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("invitation")}
                        className={cn(
                            "flex items-center gap-1.5 rounded px-3 py-1 text-[11px] font-medium transition-colors",
                            mode === "invitation"
                                ? "bg-emerald-600 text-white"
                                : "text-slate-400 hover:text-white"
                        )}
                    >
                        <Sparkles size={12} />
                        Invitation Plateforme Client
                    </button>
                </div>
            </div>

            {mode === "invitation" ? (
                <div className={cn("space-y-2")}>
                    <div
                        className={cn(
                            "flex items-center gap-1.5 text-[11px] font-medium",
                            "text-emerald-400"
                        )}
                    >
                        <UserPlus size={14} />
                        <span>
                            Personnaliser l'e-mail d'invitation pour {email} :
                        </span>
                    </div>
                    <textarea
                        rows={4}
                        value={customInviteNote}
                        onChange={(e) => setCustomInviteNote(e.target.value)}
                        className={cn(
                            "w-full rounded-md border p-2.5 font-mono text-xs leading-relaxed focus:outline-none",
                            "border-gray-800 bg-gray-950/80 text-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                        )}
                    />
                    <div
                        className={cn(
                            "flex items-center justify-between rounded border p-2 text-[10px]",
                            "border-gray-800 bg-gray-950/40 text-slate-400"
                        )}
                    >
                        <span>
                            🔗 Lien inclus dynamiquement :{" "}
                            <strong className={cn("text-slate-200")}>
                                /register?email={email}
                            </strong>
                        </span>
                    </div>
                </div>
            ) : (
                <textarea
                    rows={3}
                    placeholder="Rédigez votre réponse..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full rounded-md border border-gray-800 bg-gray-950/60 p-2.5 text-xs text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
            )}

            <div className={cn("flex justify-end")}>
                <Button
                    size="sm"
                    onClick={onSend}
                    disabled={isDisabled}
                    className={cn(
                        "h-8 gap-2 text-xs text-white",
                        mode === "invitation"
                            ? "bg-emerald-600 hover:bg-emerald-500"
                            : "bg-gray-800 hover:bg-gray-700"
                    )}
                >
                    <Send size={12} />
                    {mode === "invitation"
                        ? "Envoyer l'invitation client"
                        : "Envoyer la réponse"}
                </Button>
            </div>
        </div>
    )
}
