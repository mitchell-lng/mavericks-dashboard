import './card.css'

import type { ReactNode } from 'react';

const Card = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`card ${className}`}>{children}</div>
  )
}

const CardImage = ({ src, alt }: { src: string, alt: string }) => {
  return (
    <img className='card-image' src={src} alt={alt} />
  )
}

const CardHeader = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`card-header ${className}`}>{children}</div>
  )
}

const CardBody = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`card-body ${className}`}>{children}</div>
  )
}

const CardFooter = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`card-footer ${className}`}>{children}</div>
  )
}

Card.Header = CardHeader
Card.Body = CardBody
Card.Footer = CardFooter
Card.Image = CardImage
Card.displayName = 'Card'
CardHeader.displayName = 'CardHeader'
CardBody.displayName = 'CardBody'
CardFooter.displayName = 'CardFooter'

export default Card