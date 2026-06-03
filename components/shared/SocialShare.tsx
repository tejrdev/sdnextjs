import { useState, useEffect, MouseEvent } from "react";
import { IoLinkSharp } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

const SocialShare = ({ title = '' }: { title?: string }) => {
    const [currentUrl, setCurrentUrl] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUrl(window.location.href);
        }
    }, []);

    const shareUrl = currentUrl || '';
    const shareTitle = title || '';

    const handleCopyLink = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        if (navigator.clipboard && shareUrl) {
            navigator.clipboard.writeText(shareUrl).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = shareUrl;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const getLinkedInUrl = (): string => {
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    };

    const getTwitterUrl = (): string => {
        return `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
    };

    const getFacebookUrl = (): string => {
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    };

    return (
        <ul className="list-none ml-0 my-1 flex flex-wrap space-x-3 items-center">
            <li>
                <button
                    onClick={handleCopyLink}
                    className='-rotate-45 text-black inline-flex items-center justify-center size-7 rounded-3xl bg-slate-200 text-2xl p-1 hover:bg-slate-300 transition-colors'
                    title={copied ? 'Link copied!' : 'Copy link'}
                >
                    <IoLinkSharp />
                </button>
            </li>
            <li>
                <Link
                    href={getLinkedInUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-black inline-flex items-center justify-center size-7 rounded-3xl bg-slate-200 text-2xl p-1 hover:bg-slate-300 transition-colors'
                    title="Share on LinkedIn"
                >
                    <FaLinkedin />
                </Link>
            </li>
            <li>
                <Link
                    href={getTwitterUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-black inline-flex items-center justify-center size-7 rounded-3xl bg-slate-200 text-2xl p-1 hover:bg-slate-300 transition-colors'
                    title="Share on Twitter/X"
                >
                    <FaXTwitter />
                </Link>
            </li>
            <li>
                <Link
                    href={getFacebookUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className='text-black inline-flex items-center justify-center size-7 rounded-3xl bg-slate-200 text-2xl p-1 hover:bg-slate-300 transition-colors'
                    title="Share on Facebook"
                >
                    <FaFacebook />
                </Link>
            </li>
        </ul>
    )
}

export default SocialShare;