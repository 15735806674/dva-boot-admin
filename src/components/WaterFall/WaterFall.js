import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Masonry from 'masonry-layout';
import cx from 'classnames';
import resizeMe from '@/decorator/resizeMe';
import isEqual from 'react-fast-compare';
import './style/index.less';

@resizeMe({ refreshRate: 50 })
class WaterFall extends Component {
  static propTypes = {
    dataSource: PropTypes.array,
    columnWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gutter: PropTypes.number,
    horizontalOrder: PropTypes.bool,
    percentPosition: PropTypes.bool,
    fitWidth: PropTypes.bool
  };
  static defaultProps = {
    prefixCls: 'antui-waterfall'
  };

  componentDidMount() {
    const {
      columnWidth,
      gutter,
      horizontalOrder,
      percentPosition,
      fitWidth,
    } = this.props;

    this.msnry = new Masonry(this.node, {
      itemSelector: '.antui-waterfall-item',
      columnWidth:
        typeof columnWidth === 'string' ? '.antui-waterfall-item' : columnWidth,
      gutter,
      horizontalOrder,
      percentPosition,
      fitWidth
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !isEqual(prevProps.size, this.props.size)
    ) {
      this.msnry.layout();
    }
  }

  componentWillUnmount() {
    this.msnry.destroy();
  }

  renderItem = dataSource => {
    const { render, columnWidth, gutter, itemStyle } = this.props;
    const renderFunc = render ? render : item => item;

    const style = {
      width: columnWidth
    };
    if (gutter) {
      style.marginBottom = gutter;
    }

    return dataSource.map((item, index) => {
      return (
        <div
          key={index}
          className="antui-waterfall-item"
          style={{ ...style, ...itemStyle }}
        >
          {renderFunc(item, index)}
        </div>
      );
    });
  };

  render() {
    const { prefixCls, className, dataSource, ...otherProps } = this.props;
    const classnames = cx(prefixCls, className);
    return (
      <div ref={node => (this.node = node)} className={classnames}>
        {this.renderItem(dataSource)}
      </div>
    );
  }
}

export default WaterFall;
