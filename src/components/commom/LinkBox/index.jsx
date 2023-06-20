import Link from "next/link";
import { Text, TextSelected, LinkBoxStyle, LinkBoxStyleSelected, LinkBoxDetailSelected } from './styles';

const LinkBox = ({ selected, linkText, text }) => {
    if (selected) {
        return (
            <LinkBoxStyleSelected>
                <TextSelected>
                    <Link href={linkText}>{text}</Link>
                </TextSelected>
                <LinkBoxDetailSelected />
            </LinkBoxStyleSelected>
        )
    } else {
        return (
            <LinkBoxStyle>
                <Text>
                    <Link href={linkText}>{text}</Link>
                </Text>
            </LinkBoxStyle>
        )
    }
}

export default LinkBox;