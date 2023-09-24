import { useMessages } from "@xmtp/react-sdk";
import type { CachedConversation } from "@xmtp/react-sdk";

export const Messages: React.FC<{
    conversation: CachedConversation;
}> = ({ conversation }) => {
    const { error, messages, isLoading } = useMessages(conversation);

    if (error) {
        return "An error occurred while loading messages";
    }

    if (isLoading) {
        return "Loading messages...";
    }

    return (
        <div>
            {messages.map((message) => (
                <div key={message.id}>
                    <div>{message.content}</div>
                </div>
            ))}
        </div>
    );
};