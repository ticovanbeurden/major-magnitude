import type {PortableTextComponents} from '@portabletext/react';

import {PortableText} from '@portabletext/react';
import {useMemo} from 'react';

import type {PriceBlockProps} from '../blocks/price-block';
import type {ShopifyDescriptionBlockProps} from '../blocks/shopify-description-block';
import type {ShopifyTitleBlockProps} from '../blocks/shopify-title-block';
import type {ExternalLinkAnnotationProps} from '../sanity/richtext/components/external-link-annotation';
import type {InternalLinkAnnotationProps} from '../sanity/richtext/components/internal-link-annotation';
import type {FeaturedProductSectionProps} from '../sections/featured-product-section';
import type {ProductInformationSectionProps} from '../sections/product-information-section';
import type {AddToCartButtonBlockProps} from './product-form';

import {PriceBlock} from '../blocks/price-block';
import {ShopifyDescriptionBlock} from '../blocks/shopify-description-block';
import {ShopifyTitleBlock} from '../blocks/shopify-title-block';
import {ExternalLinkAnnotation} from '../sanity/richtext/components/external-link-annotation';
import {InternalLinkAnnotation} from '../sanity/richtext/components/internal-link-annotation';
import {ProductForm} from './product-form';
import { AddToCartButton } from '@shopify/hydrogen-react';

export function ProductDetails({
  data,
}: {
  data: FeaturedProductSectionProps | ProductInformationSectionProps;
}) {
  // This code defines a set of UI components that will be reused throughout the product details page
  // We use useMemo to optimize performance by only recreating these components when necessary
  const Components = useMemo(
    () => ({
      // These are components for handling different types of links in the content
      marks: {
        // For links to external websites (like social media, other stores, etc)
        externalLink: (props: {
          children: React.ReactNode; // The text/content inside the link
          value: ExternalLinkAnnotationProps; // Properties like the URL, target, etc
        }) => {
          return (
            <ExternalLinkAnnotation {...props.value}>
              {props.children}
            </ExternalLinkAnnotation>
          );
        },
        // For links to other pages within our own website
        internalLink: (props: {
          children: React.ReactNode; // The text/content inside the link  
          value: InternalLinkAnnotationProps; // Properties like the page to link to
        }) => {
          return (
            <InternalLinkAnnotation {...props.value}>
              {props.children}
            </InternalLinkAnnotation>
          );
        },
      },
      // These are components for different parts of the product page
      types: {
        // The "Add to Cart" button component
        addToCartButton: (props: {value: AddToCartButtonBlockProps}) => (
          <ProductForm {...props.value} />
        ),
        // The product price display component
        price: (props: {value: PriceBlockProps}) => (
          <PriceBlock {...props.value} />
        ),
        // The product description component that comes from Shopify
        shopifyDescription: (props: {value: ShopifyDescriptionBlockProps}) => (
          <ShopifyDescriptionBlock {...props.value} />
        ),
        // The product title component that comes from Shopify
        shopifyTitle: (props: {value: ShopifyTitleBlockProps}) => (
          <ShopifyTitleBlock {...props.value} />
        ),
      },
    }),
    [], // This empty array means these components only get recreated if the code itself changes
  );

  return (
    <div className="container space-y-4 lg:max-w-none lg:px-0">
      {data.richtext && (<>
        <PortableText
          components={Components as PortableTextComponents}
          value={data.richtext}
        /></>
      )}
    </div>
  );
}
