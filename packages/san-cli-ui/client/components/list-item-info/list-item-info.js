/**
 * @file List-item-info组件
 * @author zttonly
 */

import Component from '@lib/san-component';
import './list-item-info.less';

export default class ListItemInfo extends Component {

    static template = /* html */`
        <div class="list-item-info">
            <div class="name" style="{{nameColor ? 'color: ' + nameColor : ''}}">
                <span>{{name}}</span>
            </div>
            <div class="description">
                <span>{{description}}</span>
                <a s-if="link"
                    class="more-info"
                    href="{{link}}"
                    target="_blank"
                    on-click="handleLink($event)"
                >
                    <s-icon type="info-circle"></s-icon>
                    {{$t('list-item-info.more')}}
                </a>
            </div>
        </div>
    `;
    initData() {
        return {
            name: '',
            description: '',
            link: '',
            selected: false
        };
    }

    handleLink(e) {
        e.stopPropagation();
    }
}
