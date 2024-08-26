export interface House {
    title: string;
    specialty: string;
}
interface MainProps {
    houses: House[];
    onChakraClick: (House: House) => void;
    view: boolean;
}
declare const Chart: ({ houses, onChakraClick, view }: MainProps) => import("react").JSX.Element;
export default Chart;
//# sourceMappingURL=chart.d.ts.map