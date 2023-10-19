import Link from "next/link";
import { Text, TextSelected, LinkBoxStyle, LinkBoxStyleSelected, LinkBoxDetailSelected } from './styles';
import { useAuth } from "../../../contexts/AuthContext";

const LinkBox = ({ selected, linkText, text, showPopUpSignUp }) => {
    const authContext = useAuth()
    
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
            <Link href={authContext.isPendingSignUp ? "/home" : linkText}>
                <LinkBoxStyle onClick={() => authContext.isPendingSignUp ? showPopUpSignUp(true) : "" }>
                    <Text>
                        {text}
                    </Text>
                </LinkBoxStyle>
            </Link>
        )
    }
}

export default LinkBox;