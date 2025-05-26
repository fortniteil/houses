import { ChannelPreviewProps } from 'stream-chat-react';

export const CustomChannelPreview = (props: ChannelPreviewProps) => {
    const { channel, setActiveChannel } = props;

    const messages = channel?.state?.messages || [];
    const messagePreview = messages.length > 0 ? messages[messages.length - 1]?.text?.slice(0, 30) : 'No messages yet';

    const styles = {
        container: {
            margin: '12px',
            display: 'flex',
            gap: '5px',
            cursor: 'pointer',
        },
        image: {
            height: '36px',
            borderRadius: '50%',
        },
        details: {
            flex: 1,
        },
        messagePreview: {
            fontSize: '14px',
            color: '#555',
        },
    };
    console.log(channel);
    return (
        <div onClick={() => setActiveChannel?.(channel)} style={styles.container}>
            <div>
                <img
                    src={channel.data?.image ?? `https://getstream.io/random_png/?name=unknown`}
                    alt={`${channel.data?.name || 'Unnamed Channel'} image`}
                    style={styles.image}
                />
            </div>
            <div style={styles.details}>
                <div>{channel.data?.name || 'Unnamed Channel'}</div>
                {messagePreview && <div style={styles.messagePreview}>{messagePreview}</div>}
            </div>
        </div>
    );
};
