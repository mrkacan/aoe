import classNames from "classnames";
import { TITLE } from "../../common/config/constants";

interface ITitleProps {
    title?: string;
    onClick?: () => void;
    type: string
}

const Title = ({
                   type,
                   title,
                   onClick,
               }: ITitleProps) => {

    const titleClassNames = classNames({
        'text-black font-medium': true,
        'text-2xl': TITLE.H1 === type,
        'text-xl mb-4': TITLE.H2 === type,
    });

    return (
        <div
            onClick={onClick}
            className={titleClassNames}
        >
            {title}
        </div>
    );
};

export default Title;
