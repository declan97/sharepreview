import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
      {/* Gradient highlight on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative">
        <div className="inline-flex rounded-xl bg-primary/10 p-3 text-primary transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}
