import classNames from "classnames";
import { TITLE } from "../../common/config/constants";

interface ITitleProps {
    title?: string;
    type: string
}

const Title = ({
                   type,
                   title,
               }: ITitleProps) => {

    const titleClassNames = classNames({
        'text-black font-medium': true,
        'text-2xl': TITLE.H1 === type,
        'text-xl': TITLE.H2 === type,
    });

    return (
        <div className={titleClassNames}>
            {title}
        </div>
    );
};

export default Title;
