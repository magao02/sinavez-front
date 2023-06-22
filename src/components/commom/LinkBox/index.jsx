import Link from "next/link";
import { Text, TextSelected, LinkBoxStyle, LinkBoxStyleSelected, LinkBoxDetailSelected } from './styles';

const LinkBox = ({ selected, linkText, text }) => {
    if (selected) {
        return (
            <Link href={linkText}>
                <LinkBoxStyleSelected>
                    <TextSelected>
                        {text}
                    </TextSelected>
                    <LinkBoxDetailSelected />
                </LinkBoxStyleSelected>
            </Link>
        )
    } else {
        return (
            <Link href={linkText}>
                <LinkBoxStyle>
                    <Text>
                        {text}
                    </Text>
                </LinkBoxStyle>
            </Link>
        )
    }
}

export default LinkBox;