/* global React */
/* global ReactDOM */
/* global $ */

var Option = React.createClass({
  onMouseEnter: function(e) {
    if (!this.props.option.optgroup) {
      this.props.onMouseEnter(this.props.option);
    }
  },
  
  onClick: function(e) {
    if (!this.props.option.optgroup) {
      this.props.onClick(this.props.option);
    }
  },
  
  render: function() {
    var containerStyle = {
      width: '100%',
      display: 'inline-block',
      cursor: 'pointer',
      lineHeight: '32px',
      paddingLeft: '10px',
      paddingRight: '5px',
      verticalAlign: 'middle',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      WebkitTapHighlightColor: 'transparent',
      
      background: (this.props.active ? '#4286f4' : 'white'),
      color: (this.props.active ? 'white' : '#444444'),
      boxSizing: 'border-box',
    };
    
    if (this.props.option.optgroup) {
      containerStyle.cursor = 'default';
      containerStyle.paddingLeft = '5px';
      containerStyle.background = 'white';
      containerStyle.color = '#444444';
      containerStyle.fontWeight = 'bold';
    }
    
    return (
      <div onClick={this.onClick} style={containerStyle} onMouseEnter={this.onMouseEnter}>
        {this.props.option.label}
      </div>
    );
  },
});