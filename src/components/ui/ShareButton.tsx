"use client";

import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from "next-share";
import Tooltip from "@/components/ui/ToolTip";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
    const buttons = [
        { Component: FacebookShareButton, Icon: FacebookIcon, label: "Facebook", props: { quote: title, hashtag: "#news" }, bg: "bg-blue-600 hover:bg-blue-700" },
        { Component: TwitterShareButton, Icon: TwitterIcon, label: "Twitter", props: { title }, bg: "bg-sky-400 hover:bg-sky-500" },
        { Component: LinkedinShareButton, Icon: LinkedinIcon, label: "LinkedIn", props: {}, bg: "bg-blue-800 hover:bg-blue-900" },
        { Component: WhatsappShareButton, Icon: WhatsappIcon, label: "WhatsApp", props: { title, separator: ": " }, bg: "bg-green-500 hover:bg-green-600" },
    ];

    return (
        <div className="flex flex-wrap gap-3 my-6">
            {buttons.map(({ Component, Icon, label, props, bg }) => (
                <Tooltip key={label} text={label}>
                    <Component url={url} {...props} className={`transition-transform transform hover:scale-110 ${bg} rounded-full p-2 shadow-md`}>
                        <Icon size={40} round />
                    </Component>
                </Tooltip>
            ))}
        </div>
    );
}
