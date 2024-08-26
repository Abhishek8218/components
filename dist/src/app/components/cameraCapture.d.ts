import React, { ReactNode } from 'react';
type CameraCaptureProps = {
    Customshape: 'rectangle' | 'square' | 'circle' | 'oval';
    children?: ReactNode;
    onCapture?: () => void;
    onRetake?: () => void;
    onSave?: (imageData: string) => void;
    onShapeChange?: () => void;
    captureButtonLabel?: string;
    retakeButtonLabel?: string;
    saveButtonLabel?: string;
    changeShapeButtonLabel?: string;
};
declare const CameraCapture: React.FC<CameraCaptureProps>;
export default CameraCapture;
//# sourceMappingURL=cameraCapture.d.ts.map