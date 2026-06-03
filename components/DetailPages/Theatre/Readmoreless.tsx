import React, { useEffect, useRef, useState } from "react";

export default function Readmoreless({ children, collapsedHeight = 120 }) {
    const contentRef = useRef(null);

    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            const fullHeight = (contentRef.current as HTMLElement).scrollHeight;

            setContentHeight(fullHeight);
            setShowButton(fullHeight > collapsedHeight);
        }
    }, [children, collapsedHeight]);
    return (
        <div>
            <div
                ref={contentRef}
                style={!expanded && showButton ? {
                    maxHeight: expanded ? `${contentHeight}px` : `${collapsedHeight}px`,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    position: "relative",
                } : {}}
            >
                <div dangerouslySetInnerHTML={{ __html: children }}></div>

                {!expanded && showButton && (
                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: "40px",
                            background:
                                "linear-gradient(to bottom, transparent, white)",
                        }}
                    />
                )}
            </div>

            {showButton && (
                <button
                    onClick={() => setExpanded((prev) => !prev)}
                    style={{
                        marginTop: "8px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                    }}
                    className="readmore_btn printdochide font-semibold text-black"
                >
                    {expanded ? "Read Less" : "Read More"}
                </button>
            )}
        </div>
    );
}