import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Lock,
  KeyRound,
  AlertCircle,
  RotateCcw,
  Eye,
  ShieldAlert,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { RESUME_CONFIG } from '@/lib/constants';
import resumeFileUrl from '@/assets/Resume.pdf';

interface ResumeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'resume_access_unlocked';

export const ResumeRequestModal = ({ isOpen, onClose }: ResumeRequestModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email' | 'code'>('whatsapp');
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Passcode state
  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [requestNotice, setRequestNotice] = useState<string | null>(null);

  // WhatsApp form state
  const [waData, setWaData] = useState({
    name: '',
    company: '',
    purpose: '',
  });

  // Email form state
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resume source URL (env override or bundled asset)
  const resumeUrl = import.meta.env.VITE_RESUME_URL || resumeFileUrl;

  // Restore session access if previously unlocked
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unlocked = sessionStorage.getItem(STORAGE_KEY) === 'true';
      if (unlocked) {
        setIsUnlocked(true);
      }
    }
  }, []);

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');

    const expectedCode = (import.meta.env.VITE_RESUME_ACCESS_CODE || 'SAKTHI2026')
      .trim()
      .toUpperCase();
    const entered = inputCode.trim().toUpperCase();

    if (!entered) {
      setCodeError('Please enter an access code');
      return;
    }

    if (entered === expectedCode) {
      setIsUnlocked(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
      toast({
        title: 'Access Approved! 🎉',
        description: 'Resume is now open in View-Only mode.',
      });
    } else {
      setCodeError('Invalid approval code. Please check with Sakthivel on WhatsApp or Email.');
    }
  };

  const handleLockAgain = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsUnlocked(false);
    setInputCode('');
    setCodeError('');
    setRequestNotice(null);
    setActiveTab('code');
    toast({
      title: 'Resume Locked',
      description: 'Access has been revoked for this session.',
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waData.name.trim()) return;

    const message = [
      'Hi Sakthivel, I would like to request an approval code to view your resume.',
      '',
      `👤 *Name:* ${waData.name.trim()}`,
      `🏢 *Company:* ${waData.company.trim() || 'N/A'}`,
      `🎯 *Role / Purpose:* ${waData.purpose.trim() || 'Hiring / Discussion'}`,
      '',
      'Please send me the access code. Thanks!',
    ].join('\n');

    const url = `https://wa.me/916380350108?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');

    // Automatically transition to the Code screen
    setRequestNotice('WhatsApp chat opened! Once Sakthivel replies with your code, enter it below:');
    setActiveTab('code');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setIsSubmitting(false);
      window.location.href = `mailto:sakthivel24498@gmail.com?subject=Resume Access Code Request from ${encodeURIComponent(
        emailData.name
      )}&body=${encodeURIComponent(
        `Hi Sakthivel,\n\nPlease send me the access code to view your resume.\n\nName: ${emailData.name}\nEmail: ${emailData.email}\nCompany: ${emailData.company}\nNote: ${emailData.message}`
      )}`;
      setRequestNotice('Email client opened! Once Sakthivel replies with your code, enter it below:');
      setActiveTab('code');
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[Resume Access Code Request] from ${emailData.name} (${emailData.company || 'Direct'})`,
          from_name: 'Portfolio - Resume Request',
          name: emailData.name,
          email: emailData.email,
          message: `Request for Resume Access Code:\n\nName: ${emailData.name}\nEmail: ${emailData.email}\nCompany: ${emailData.company || 'N/A'}\nNote: ${emailData.message || 'None'}\n\n👉 Reply to this email with your access code (e.g. ${import.meta.env.VITE_RESUME_ACCESS_CODE || 'SAKTHI2026'}).`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit request');
      }

      toast({
        title: 'Request Sent to Sakthivel!',
        description: `Notification emailed. Check your inbox for the code.`,
      });

      // Automatically transition to the Code screen
      setRequestNotice(`Request sent! Sakthivel will email your code to ${emailData.email}. Enter it below once received:`);
      setActiveTab('code');
    } catch {
      toast({
        title: 'Failed to send request',
        description: 'Please try WhatsApp or email directly at sakthivel24498@gmail.com',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={`bg-[#0c0d14]/95 backdrop-blur-2xl border border-white/10 text-foreground rounded-2xl shadow-2xl transition-all duration-300 ${
          isUnlocked ? 'max-w-4xl w-[95vw] p-5 sm:p-6' : 'max-w-md w-[92vw] p-6'
        }`}
      >
        {isUnlocked ? (
          /* UNLOCKED RESUME VIEWER (CONTROLLED VIA RESUME_CONFIG.allowDownload) */
          <div className="space-y-4">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Access Approved
                  </span>

                  {!RESUME_CONFIG.allowDownload && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Eye className="w-3.5 h-3.5" />
                      View-Only Protected
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {RESUME_CONFIG.allowDownload && (
                    <>
                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-foreground transition"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open in Tab
                      </a>

                      <a
                        href={resumeUrl}
                        download="Sakthivel_Senior_FullStack_Resume.pdf"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary hover:bg-primary/90 text-primary-foreground transition shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download PDF
                      </a>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={handleLockAgain}
                    title="Lock again"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Lock Resume
                  </button>
                </div>
              </div>

              <div>
                <DialogTitle className="text-xl sm:text-2xl font-bold font-display text-foreground">
                  Sakthivel's Resume
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-muted-foreground">
                  Senior Full Stack Engineer (React, Spring Boot, Node.js, AWS)
                </DialogDescription>
              </div>

              {/* View-Only Security Notice (only shown when downloads are disabled) */}
              {!RESUME_CONFIG.allowDownload && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-muted-foreground">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Downloading, copying, and offline distribution are disabled to protect candidate data.</span>
                </div>
              )}
            </DialogHeader>

            {/* Embedded PDF viewer */}
            <div
              onContextMenu={!RESUME_CONFIG.allowDownload ? (e) => e.preventDefault() : undefined}
              className="w-full h-[62vh] sm:h-[66vh] rounded-xl overflow-hidden border border-white/10 bg-black/70 shadow-inner relative select-none"
            >
              <iframe
                src={`${resumeUrl}${!RESUME_CONFIG.allowDownload ? '#toolbar=0&navpanes=0&scrollbar=1' : ''}`}
                className="w-full h-full border-none pointer-events-auto"
                title="Sakthivel Resume"
              />
            </div>
          </div>
        ) : (
          /* ACCESS REQUEST & UNLOCK DIALOG */
          <div className="space-y-4">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  <Lock className="w-3 h-3" />
                  Permission Required
                </span>
              </div>
              <DialogTitle className="text-2xl font-bold font-display tracking-tight text-foreground">
                Request Resume
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
                To prevent unauthorized downloads and misuse, resume access requires an approval code.
              </DialogDescription>
            </DialogHeader>

            {/* Three Tab Switcher */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setRequestNotice(null);
                  setActiveTab('whatsapp');
                }}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'whatsapp'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </button>
              <button
                type="button"
                onClick={() => {
                  setRequestNotice(null);
                  setActiveTab('email');
                }}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'email'
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('code')}
                className={`flex items-center justify-center gap-1.5 py-2 text-xs font-medium rounded-lg transition-all ${
                  activeTab === 'code'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                Have Code?
              </button>
            </div>

            {/* WhatsApp Tab */}
            {activeTab === 'whatsapp' && (
              <form onSubmit={handleWhatsAppSubmit} className="space-y-3.5 pt-1">
                <p className="text-xs text-muted-foreground">
                  Message Sakthivel on WhatsApp. You'll be automatically redirected to enter your code once approved.
                </p>

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={waData.name}
                    onChange={(e) => setWaData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={waData.company}
                    onChange={(e) => setWaData((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Acme Corp / Client"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                    Role / Purpose
                  </label>
                  <input
                    type="text"
                    value={waData.purpose}
                    onChange={(e) => setWaData((prev) => ({ ...prev, purpose: e.target.value }))}
                    placeholder="e.g. Senior Full Stack Engineer role"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white transition shadow-lg shadow-emerald-500/20 active:scale-[0.99]"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ask Code on WhatsApp
                </button>
              </form>
            )}

            {/* Email Tab */}
            {activeTab === 'email' && (
              <form onSubmit={handleEmailSubmit} className="space-y-3.5 pt-1">
                <p className="text-xs text-muted-foreground">
                  Best for corporate recruiters. Sakthivel will email your access code directly.
                </p>

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                    Your Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={emailData.name}
                    onChange={(e) => setEmailData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Alex Smith"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                      Your Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={emailData.email}
                      onChange={(e) => setEmailData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                      Company <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={emailData.company}
                      onChange={(e) => setEmailData((prev) => ({ ...prev, company: e.target.value }))}
                      placeholder="e.g. Google"
                      className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                    Note / Role (Optional)
                  </label>
                  <input
                    type="text"
                    value={emailData.message}
                    onChange={(e) => setEmailData((prev) => ({ ...prev, message: e.target.value }))}
                    placeholder="e.g. Hiring for Senior Full Stack Engineer"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 transition"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-2 py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition shadow-lg shadow-primary/20 disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Submit & Go to Code Page
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Enter Code Tab */}
            {activeTab === 'code' && (
              <form onSubmit={handleVerifyCode} className="space-y-4 pt-1">
                {requestNotice ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-emerald-300 leading-relaxed">
                      {requestNotice}
                    </p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                    <KeyRound className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-200/90 leading-relaxed">
                      Received your approval code from Sakthivel via WhatsApp or Email? Enter it below:
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                    Approval Passcode
                  </label>
                  <input
                    type="text"
                    autoFocus
                    required
                    value={inputCode}
                    onChange={(e) => {
                      setInputCode(e.target.value);
                      setCodeError('');
                    }}
                    placeholder="Enter approval code (e.g. RESUMEACCESS)"
                    className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500/60 font-mono tracking-wider transition uppercase"
                  />
                  {codeError && (
                    <div className="flex items-center gap-1.5 mt-2 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{codeError}</span>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition shadow-lg shadow-amber-500/20 active:scale-[0.99]"
                >
                  <KeyRound className="w-4 h-4" />
                  Unlock Resume (View Only)
                </button>
              </form>
            )}

            <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/70">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
              <span>Resume is strictly view-only to prevent unauthorized downloads.</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
