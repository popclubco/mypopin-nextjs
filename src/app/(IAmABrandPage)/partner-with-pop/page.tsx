'use client'

import { Khand } from 'next/font/google'
import { Manrope } from 'next/font/google'
import dynamic from 'next/dynamic'
import { B2BHero } from '@/components/B2BHero'
import { BrandPartners } from '@/components/BrandPartners'
import { B2BPopInNumbers } from '@/components/B2BPopInNumbers'
import { B2BIntegrations } from '@/components/B2BIntegrations'
import { B2BCaseStudies } from '@/components/B2BCaseStudies'
const LeadingBrandsCarousel = dynamic(() => import('@/components/LeadingBrandsCarousel'), { ssr: false })
const TestimonialsCarousel = dynamic(() => import('@/components/TestimonialsCarousel'), { ssr: false })

const khand = Khand({
    weight: '700',
    subsets: ['latin'],
})

const manrope = Manrope({
    subsets: ['latin'],
})

function PartnerWithPOP() {
    return (
        <>
            <div className="pt-24">
                <div>
                    <B2BHero />
                </div>
                <div>
                    <div className={`${khand.className} text-7xl text-center font-bold py-10`}>Trusted By Leading Brands</div>
                    <div className='py-5 pb-10'>
                        <LeadingBrandsCarousel />
                    </div>
                </div>
                <div>
                    <BrandPartners />
                </div>
                <div>
                    <B2BPopInNumbers />
                </div>
                {/* // here new */}
                <div>
                    <B2BIntegrations />
                </div>
                {/* <div>
                    <B2BCaseStudies />
                </div> */}
                <div>
                    <div className={`${khand.className} text-7xl text-center font-bold py-10`}>Brand Testimonials</div>
                    <div style={{ overflowX: "scroll" }} className='max-w-6xl mx-auto flex'>
                        <TestimonialsCarousel />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PartnerWithPOP