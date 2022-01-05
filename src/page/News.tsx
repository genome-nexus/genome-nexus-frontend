import { remoteData } from 'cbioportal-frontend-commons';
import { observer } from 'mobx-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import * as React from 'react';
import './News.scss';
import $ from 'jquery';

@observer
class News extends React.Component<{}> {
    readonly source = remoteData<string>(async () => {
        return await $.get(
            'https://raw.githubusercontent.com/genome-nexus/genome-nexus-frontend/master/src/doc/News.md'
        );
    });

    public render() {
        const ContentImage = (props: any) => {
            return <img {...props} style={{ maxWidth: '100%' }} alt="" />;
        };
        return (
            <div>
                {this.source.isComplete && (
                    <ReactMarkdown
                        components={{ image: ContentImage }}
                        className={'markdown-body'}
                        children={this.source.result!}
                        rehypePlugins={[rehypeRaw, rehypeSanitize, remarkGfm]}
                    />
                )}
            </div>
        );
    }
}

export default News;
