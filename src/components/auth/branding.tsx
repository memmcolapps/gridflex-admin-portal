import Image from "next/image";

interface BrandingProps {
  labelTitle: string;
  label: string;
}

export function Branding({ labelTitle, label }: BrandingProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Image
            src="/images/gridflex-admin-logo.svg"
            alt="GridFlex Admin Portal"
            height={60}
            width={60}
            priority
            className=""
          />
        </div>
        <div className="text-left">
          <h1 className="text-xl font-semibold text-gray-800 leading-tight">{labelTitle}</h1>
          <p className="text-sm text-gray-600">{label}</p>
        </div>
      </div>
    </div>
  );
}