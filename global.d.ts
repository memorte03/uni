declare module '*.svg' {
    const content: any;
    export default content;
}

namespace React {

    interface DivHTMLAttributes<T> extends HTMLAttributes<T> {
        value?: string;
    }

    interface ReactHTML {
        div: DetailedHTMLFactory<DivHTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    }

}

namespace JSX {
    interface IntrinsicElements {
        div: React.DetailedHTMLProps<React.DivHTMLAttributes<HTMLDivElement>, HTMLDivElement>;
    }
}
