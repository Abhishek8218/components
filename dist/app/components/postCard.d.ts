import React from 'react';
interface CardProps {
    userId: number;
    id: number;
    title: string;
    body: string;
    innerRef?: React.Ref<HTMLParagraphElement>;
}
declare const InfoCard: ({ userId, id, title, body, innerRef, ...props }: CardProps) => React.JSX.Element;
export default InfoCard;
//# sourceMappingURL=postCard.d.ts.map