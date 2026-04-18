"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageProps {
    src: string | undefined;
    alt: string;
    fill?: boolean;
    className?: string;
    sizes?: string;
}

export function ProductImage({ src, alt, fill = true, className = "", sizes = "(max-width: 768px) 50vw, 25vw" }: ProductImageProps) {
    const [error, setError] = useState(false);
    const imgSrc = !src || error ? "/placeholder-product.png" : src;

    return (
        <Image
            src={imgSrc}
            alt={alt}
            fill={fill}
            sizes={sizes}
            className={className}
            onError={() => setError(true)}
        />
    );
}
