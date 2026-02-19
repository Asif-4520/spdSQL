import { useState } from "react";
import {
    ArrowLeft,
    Send,
    MessageSquare,
    Mail,
    AlertCircle,
    CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function Feedback() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        type: "feedback",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const feedbackTypes = [
        { value: "feedback", label: "General Feedback", icon: MessageSquare },
        { value: "bug", label: "Bug Report", icon: AlertCircle },
        { value: "feature", label: "Feature Request", icon: CheckCircle2 },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.message.trim()) {
            toast.error("Please enter your feedback");
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare the payload
            const payload = {
                type: formData.type,
                name: formData.name || "Anonymous",
                email: formData.email || "no-reply@spdsql.app",
                message: formData.message,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
            };

            // Submit to ping.me.dev
            const response = await fetch("https://ping.asifdev.workers.dev", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setSubmitted(true);
            toast.success("Thank you for your feedback!");

            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    name: "",
                    email: "",
                    type: "feedback",
                    message: "",
                });
                setSubmitted(false);
            }, 3000);
        } catch (error) {
            console.error("Submission error:", error);
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="h-full overflow-auto bg-(--bg-panel) text-(--text-primary)">
            <div className="max-w-2xl mx-auto px-6 py-8 space-y-8">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-xl hover:bg-(--bg-activity-bar) transition-colors"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold">Send Feedback</h1>
                        <p className="text-sm text-(--text-secondary) mt-1">
                            Help us improve spdSQL with your feedback
                        </p>
                    </div>
                </div>

                {/* Feedback Form */}
                <div className="bg-(--bg-activity-bar) rounded-2xl border border-(--border-color) p-6">
                    {submitted ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full">
                                <CheckCircle2
                                    size={32}
                                    className="text-green-400"
                                />
                            </div>
                            <h3 className="text-xl font-semibold">
                                Thank you!
                            </h3>
                            <p className="text-(--text-secondary)">
                                Your feedback has been received. We appreciate
                                your input!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Feedback Type */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Feedback Type
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {feedbackTypes.map((type) => {
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.value}
                                                type="button"
                                                onClick={() =>
                                                    setFormData((prev) => ({
                                                        ...prev,
                                                        type: type.value,
                                                    }))
                                                }
                                                className={`p-4 rounded-xl border transition-all ${
                                                    formData.type === type.value
                                                        ? "border-(--accent-color) bg-(--accent-color)/10"
                                                        : "border-(--border-color) hover:border-(--accent-color)/50"
                                                }`}
                                            >
                                                <Icon
                                                    size={24}
                                                    className="mx-auto mb-2"
                                                />
                                                <div className="text-xs font-medium">
                                                    {type.label}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Name */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="name"
                                    className="text-sm font-medium"
                                >
                                    Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full px-4 py-3 bg-(--bg-panel) border border-(--border-color) rounded-xl focus:outline-none focus:border-(--accent-color) transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-medium flex items-center gap-2"
                                >
                                    <Mail size={16} />
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    className="w-full px-4 py-3 bg-(--bg-panel) border border-(--border-color) rounded-xl focus:outline-none focus:border-(--accent-color) transition-colors"
                                />
                                <p className="text-xs text-(--text-secondary)">
                                    We'll only use this to follow up if needed
                                </p>
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="message"
                                    className="text-sm font-medium flex items-center gap-2"
                                >
                                    <MessageSquare size={16} />
                                    Your Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you think, report a bug, or suggest a feature..."
                                    rows={6}
                                    required
                                    className="w-full px-4 py-3 bg-(--bg-panel) border border-(--border-color) rounded-xl focus:outline-none focus:border-(--accent-color) transition-colors resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting || !formData.message}
                                className={`w-full px-6 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                                    isSubmitting || !formData.message
                                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                                        : "bg-(--accent-color) text-white hover:opacity-90"
                                }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send size={18} />
                                        Send Feedback
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Additional Info */}
                <div className="bg-(--bg-activity-bar) rounded-2xl border border-(--border-color) p-6 space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                        <MessageSquare size={20} />
                        Other Ways to Reach Us
                    </h3>
                    <div className="space-y-2 text-sm text-(--text-secondary)">
                        <p>
                            • Email us directly at:{" "}
                            <a
                                href="mailto:asif.emailservice@gmail.com"
                                className="text-(--accent-color) hover:underline"
                            >
                                asif.emailservice@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
