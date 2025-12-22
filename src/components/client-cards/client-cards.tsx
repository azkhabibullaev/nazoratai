export type ClientCardsProps = {
    cardType: "UZCARD" | "HUMO";
};

export function ClientCards({ cardType }: ClientCardsProps) {
    const cardColors = {
        UZCARD: "rgba(59,97,164,0.77)",
        HUMO: "rgba(190,153,0,0.77)",
    };

    return (
        <div>
            <div className="relative flex flex-col h-40 text-white rounded-2xl cursor-pointer bg-[url(/card-background.jpeg)] bg-cover bg-top-left bg-no-repeat overflow-hidden">
                <div
                    style={{ background: cardColors[cardType] }}
                    className="flex flex-col justify-center h-3/5 pt-2.5 px-3 pb-1.5 bg-[radial-gradient(circle,rgba(255,255,255,0.15),transparent,60%)] from-gray-100 to-slate-800 opacity-80"
                >
                    <div className="flex items-center justify-between">
                        <div>DAVR</div>
                        <div>123456</div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>986025**7902</div>
                        <div>10/26</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center h-3/6 py-1.5 px-3 bg-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-300">Azamat Khabibulalev</div>
                        <div className="text-xs text-gray-300">UZCARD</div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">
                            <div>
                                <span>308,75</span>
                                <span className="text-gray-400"></span>
                            </div>
                        </div>
                        <div className="text-sm font-medium px-1">ACTIVE</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
