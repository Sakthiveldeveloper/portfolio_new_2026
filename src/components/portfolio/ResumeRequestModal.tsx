import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { MessageCircle, Mail, Send, CheckCircle2, ShieldCheck, Loader2, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumeRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeRequestModal = ({ isOpen, onClose }: ResumeRequestModalProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'email'>('whatsapp');

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
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waData.name.trim()) return;

    const message = [
      'Hi Sakthivel, I would like to request your resume.',
      '',
      `👤 *Name:* ${waData.name.trim()}`,
      `🏢 *Company:* ${waData.company.trim() || 'N/A'}`,
      `🎯 *Purpose:* ${waData.purpose.trim() || 'Hiring / Discussion'}`,
    ].join('\n');

    const url = `https://wa.me/916380350108?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setIsSubmitting(false);
      window.location.href = `mailto:sakthivel24498@gmail.com?subject=Resume Request from ${encodeURIComponent(emailData.name)}&body=${encodeURIComponent(
        `Name: ${emailData.name}\nEmail: ${emailData.email}\nCompany: ${emailData.company}\nMessage: ${emailData.message}`
      )}`;
      onClose();
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
          subject: `[Resume Request] from ${emailData.name} (${emailData.company || 'Direct'})`,
          from_name: 'Portfolio - Resume Request',
          name: emailData.name,
          email: emailData.email,
          message: `Resume Request Details:\n\nName: ${emailData.name}\nEmail: ${emailData.email}\nCompany: ${emailData.company || 'N/A'}\nNote: ${emailData.message || 'None'}`,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit request');
      }

      setIsSubmitted(true);
      toast({
        title: 'Request Received!',
        description: "I'll review and email you the resume shortly.",
      });

      setTimeout(() => {
        setIsSubmitted(false);
        setEmailData({ name: '', email: '', company: '', message: '' });
        onClose();
      }, 2500);
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
      <DialogContent className="max-w-md w-[92vw] bg-[#0c0d14]/95 backdrop-blur-2xl border border-white/10 text-foreground p-6 rounded-2xl shadow-2xl">
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
            To prevent unauthorized downloads and misuse of personal information, resume access is provided directly upon approval.
          </DialogDescription>
        </DialogHeader>

        {/* Tab switch */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-xl my-2">
          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === 'whatsapp'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Via WhatsApp (Instant)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`flex items-center justify-center gap-2 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === 'email'
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Mail className="w-4 h-4" />
            Via Email
          </button>
        </div>

        {/* WhatsApp Tab */}
        {activeTab === 'whatsapp' && (
          <form onSubmit={handleWhatsAppSubmit} className="space-y-4 pt-1">
            <p className="text-xs text-muted-foreground">
              Opens a direct WhatsApp chat with Sakthivel. You can introduce yourself and request the resume with one tap.
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
                placeholder="e.g. Acme Corp / Freelance"
                className="w-full px-3.5 py-2.5 bg-black/40 border border-white/10 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground/80 mb-1.5">
                Purpose / Role
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
              Request on WhatsApp
            </button>
          </form>
        )}

        {/* Email Tab */}
        {activeTab === 'email' && (
          <div>
            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-semibold text-foreground">Request Submitted</h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Thank you! I will verify your details and email my resume to <span className="text-foreground font-medium">{emailData.email}</span> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="space-y-3.5 pt-1">
                <p className="text-xs text-muted-foreground">
                  Ideal for corporate recruiters. Sakthivel will receive your request and email the resume to you.
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
                    placeholder="e.g. Reaching out regarding Senior Full Stack role"
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
                      Submit Request
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        )}

        <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/70">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
          <span>Your contact info is strictly confidential and never shared.</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
