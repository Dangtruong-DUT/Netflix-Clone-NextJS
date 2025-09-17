import { APP_FEATURES, FeatureType } from "@/app/[locale]/(main)/home/_constants";
import { cn } from "@/lib/utils";

interface FeaturesSectionProps {
    className?: string;
}
export function FeaturesSection({ className }: FeaturesSectionProps) {
    return (
        <div className={cn("grid grid-cols-1   md:grid-cols-2 xl:grid-cols-4 gap-2  md:gap-4", className)}>
            {APP_FEATURES.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
            ))}
        </div>
    );
}

function FeatureCard({ feature }: { feature: FeatureType }) {
    const { title, description, Icon } = feature;

    return (
        <div className="bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-purple-800/30 rounded-2xl  xl:min-h-[308px] flex flex-col justify-between border border-purple-500/20 backdrop-blur-sm p-4">
            <div className="flex-1">
                <h3 className="text-white text-2xl font-bold mb-4">{title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{description}</p>
            </div>
            <div className="flex justify-end ">
                <div className="w-16 h-16 flex items-center justify-center">
                    <Icon className="w-18 h-18 text-purple-400" />
                </div>
            </div>
        </div>
    );
}
