/* global React */
/* global ReactDOM */

var Select = React.createClass({
  getDefaultProps: function() {
    return {
      onChange: function() {},
      onClick: function() {},
      onFocus: function() {},
      onBlur: function() {},
      value: 0,
      options: [
        {
          value: 0,
          label: "Option 0",
        },
        {
          value: 1,
          label: "Option 1",
        },
        {
          value: 2,
          label: "Option 2",
        },
      ],
    };
  },
  
  getInitialState: function() {
    var choice;
    var optionsExist = this.props.options && this.props.options.length > 0;
    
    if (optionsExist) {
      choice = this.props.options.find(function(option) {
        return option.value == this.props.value;
      }.bind(this));
      
      if (!choice) {
        console.log("No option given from options prop that matches value prop given, setting initial choice to options[0]");
        choice = this.props.options[0];
      }
    } else {
      choice = {
        label: "",
        value: "",
      };
    }
    
    return {
      expanded: false,
      noOptions: false,
      options: this.props.options,
      choice: choice,
      active: choice,
    };
  },
  
  componentWillReceiveProps: function(nextProps) {
    var choice;
    var optionsExist = nextProps.options && nextProps.options.length > 0;
    
    if (optionsExist) {
      choice = nextProps.options.find(function(option) {
        return option.value == nextProps.value;
      }.bind(this));
      
      if (!choice) {
        console.log("No option given from options prop that matches value prop given, setting initial choice to options[0]");
        choice = nextProps.options[0];
      }
    } else {
      choice = {
        label: "",
        value: "",
      };
    }
    
    this.setState({
      expanded: false,
      noOptions: false,
      options: nextProps.options,
      choice: choice,
      active: choice,
    });
  },
  
  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKeydown, false);
    window.addEventListener('mousedown', this.handleMousedown, false);
    window.addEventListener('touchend', this.handleMouseup, false);
    window.addEventListener('touchstart', this.handleTouchstart, false);
    window.addEventListener('mouseup', this.handleTouchend, false);
  },
  
  componentWillUnmount: function() {
    window.removeEventListener('keydown', this.handleKeydown, false);
    window.removeEventListener('mousedown', this.handleMousedown, false);
    window.removeEventListener('mouseup', this.handleMouseup, false);
    window.removeEventListener('touchstart', this.handleTouchstart, false);
    window.removeEventListener('touchend', this.handleTouchend, false);
  },
  
  handleKeydown: function(e) {
    if (!this.state.expanded) {
      return;
    }
    
    switch(e.key) {
      case 'Escape':
        this.collapse();
        break;
      case 'Enter':
        if (this.state.expanded) {
          this.handleSelect(this.state.active);
          this.collapse();
        }
        break;
      case 'Tab':
        if (this.state.expanded) {
          e.preventDefault();
          this.collapse();
        }
        break;
      case ' ':
        // e.preventDefault();
        this.expand();
        break;
      case 'ArrowUp':
        e.preventDefault();
        this.up();
        break;
      case 'ArrowDown':
        e.preventDefault();
        this.down();
        break;
    }
  },
  
  handleMousedown: function(e) {
    if (this.mouseIsDownOnThis) {
      if (this.mouseIsDownOnBox) {
        this.toggle();
      }
    } else {
      this.collapse();
    }
  },
  
  handleMouseup: function(e) {
    this.mouseIsDownOnThis = false;
    this.mouseIsDownOnBox = false;
    this.touchStartedOnThis = false;
  },
  
  handleTouchstart: function(e) {
    if (!this.mouseIsDownOnThis && this.touchStartedOnThis) {
      if (this.mouseIsDownOnBox) {
        this.toggle();
      }
    } else {
      this.collapse();
    }
  },
  
  handleTouchend: function(e) {
    this.mouseIsDownOnThis = false;
    this.mouseIsDownOnBox = false;
    this.touchStartedOnThis = false;
  },
  
  onMouseDown: function() {
    this.mouseIsDownOnThis = true;
  },
  
  onTouchStart: function() {
    this.touchStartedOnThis = true;
  },
  
  boxOnMouseDown: function(e) {
    this.mouseIsDownOnBox = true;
  },
  
  onOptionMouseEnter: function(option) {
    this.setState({
      active: option,
    });
  },
  
  collapse: function() {
    // ReactDOM.findDOMNode(this.refs.search).value = "";
    
    this.setState({
      expanded: false,
      noOptions: false,
      options: this.props.options,
      active: null,
    });
  },
  
  expand: function() {
    var option = this.state.options.find(function(option) {
      return option.value == this.state.choice.value;
    }.bind(this));
    
    this.setState({
      expanded: true,
      active: option,
    }, this.props.onFocus);
  },
  
  toggle: function() {
    if (this.state.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  },
  
  down: function() {
    var index = this.state.options.indexOf(this.state.active);
    
    var nextActive = this.state.options.find(function(option, i) {
      return i > index && !option.optgroup;
    }.bind(this));
    
    if (nextActive) {
      this.setState({
        active: nextActive,
      });
    }
  },
  
  up: function() {
    var options = this.state.options.slice().reverse();
    
    var index = options.indexOf(this.state.active);
    
    var nextActive = options.find(function(option, i) {
      return i > index && !option.optgroup;
    }.bind(this));
    
    if (nextActive) {
      this.setState({
        active: nextActive,
      });
    }
  },
  
  search: function(e) {
    var re = new RegExp(e.target.value, 'i');
    var options = [];
    
    if (e.target.value == "") {
      options = this.props.options;
    } else {
      this.props.options.forEach(function(option) {
        if (!option.optgroup && option.label.match(re)) {
          options.push(option);
        }
      });
    }
    
    this.setState({
      noOptions: options.length < 1,
      options: options,
    });
  },
  
  handleSelect: function(option) {
    this.collapse();
    
    if (!this.props.disableSelfUpdate) {
      if (option != this.state.choice) {
        this.setState({
          choice: option
        }, function() {
          this.props.onChange(option.value);
        }.bind(this));
      }
    } else {
      this.props.onChange(option.value);
    }
  },
  
  showNoOptions: function() {
    if (this.state.noOptions) {
      var containerStyle = {
        width: '100%',
        display: 'inline-block',
        cursor: 'pointer',
        lineHeight: '26px',
        paddingLeft: '10px',
        verticalAlign: 'middle',
        paddingRight: '5px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        WebkitTapHighlightColor: 'transparent',
        background: 'white',
        color: '#444444',
      };
    
      return (
        <div style={containerStyle}>
          No results found
        </div>
      );
    } else {
      return null;
    }
  },
  
  render: function() {
    const containerStyle = {
      width: '100%',
      position: 'relative',
      boxSizing: 'border-box',
    };
    
    var conditionalRadius = this.state.expanded ? '0px' : '4px';
    
    const boxStyle = {
      height: '34px',
      cursor: 'pointer',
      WebkitUserSelect: 'none',
      border: '1px solid #aaaaaa',
      WebkitBorderTopLeftRadius: '4px',
      WebkitBorderTopRightRadius: '4px',
      WebkitBorderBottomLeftRadius: conditionalRadius,
      WebkitBorderBottomRightRadius: conditionalRadius,
      MozBorderRadiusTopleft: '4px',
      MozBorderRadiusTopright: '4px',
      MozBorderRadiusBottomleft: conditionalRadius,
      MozBorderRadiusBottomright: conditionalRadius,
      OBorderTopLeftRadius: '4px',
      OBorderTopRightRadius: '4px',
      OBorderBottomLeftRadius: conditionalRadius,
      OBorderBottomRightRadius: conditionalRadius,
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      borderBottomLeftRadius: conditionalRadius,
      borderBottomRightRadius: conditionalRadius,
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box',
    };
    
    const valueStyle = {
      width: 'calc(100% - 31px)',
      display: 'inline-block',
      lineHeight: '32px',
      paddingLeft: '10px',
      verticalAlign: 'middle',
      paddingRight: '5px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      WebkitTapHighlightColor: 'transparent',
      borderRight: '1px solid #aaaaaa',
      boxSizing: 'border-box',
    };
    
    const arrowStyle = {
      width: '30px',
      display: 'inline-block',
      fontSize: '10px',
      textAlign: 'center',
      verticalAlign: 'middle',
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box',
    };
    
    const searchContainerStyle = {
      position: 'absolute',
      zIndex: '1001',
      display: (this.state.expanded ? 'inline-block' : 'none'),
      borderLeft: '1px solid #aaaaaa',
      borderRight: '1px solid #aaaaaa',
      height: '48px',
      width: '100%',
      padding: '3px',
      background: 'white',
      boxSizing: 'border-box',
    };
    
    const searchOutlineStyle = {
      display: (this.state.expanded ? 'inline-block' : 'none'),
      height: '100%',
      width: '100%',
      padding: '5px',
      background: 'white',
      border: '1px solid #4286f4',
      WebkitBorderRadius: '2px',
      MozBorderRadius: '2px',
      OBorderRadius: '2px',
      borderRadius: '2px',
      boxSizing: 'border-box',
    };
    
    const searchStyle = {
      display: (this.state.expanded ? 'inline-block' : 'none'),
      height: '100%',
      width: 'calc(100% - 30px)',
      verticalAlign: 'middle',
      background: 'white',
      border: 'none',
      paddingLeft: '5px',
      boxSizing: 'border-box',
    };
    
    const glassStyle = {
      display: (this.state.expanded ? 'inline-block' : 'none'),
      width: '30px',
      color: '#aaaaaa',
      fontSize: '10px',
      textAlign: 'center',
      verticalAlign: 'middle',
      WebkitTapHighlightColor: 'transparent',
      boxSizing: 'border-box',
    };
    
    const optionNumberScroll = 5;
    
    var menuHeight;
    var menuOverflow;
    
    if (this.state.noOptions) {
      menuHeight = '33px';
      menuOverflow = 'visible';
    } else if (this.state.options.length < optionNumberScroll) {
      menuHeight = (this.state.options.length * 32 + 1)  + 'px';
      menuOverflow = 'visible';
    } else {
      menuHeight = (optionNumberScroll * 32 + 1)  + 'px';
      menuOverflow = 'scroll';
    }
    
    const menuStyle = {
      position: 'absolute',
      zIndex: '1001',
      top: '82px',
      display: (this.state.expanded ? 'inline-block' : 'none'),
      width: '100%',
      height: menuHeight,
      overflowY: menuOverflow,
      WebkitUserSelect: 'none',
      borderLeft: '1px solid #aaaaaa',
      borderRight: '1px solid #aaaaaa',
      borderBottom: '1px solid #aaaaaa',
      borderTop: 'transparent',
      background: 'white',
      WebkitTapHighlightColor: 'transparent',
    };
    
    const arrow = this.state.expanded ? <div style={arrowStyle}>&#9650;</div> : <div style={arrowStyle}>&#9660;</div>;
    
    return (
      <div className="remove-focus-outline" style={containerStyle} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} tabIndex="0">
        <div style={boxStyle} onMouseDown={this.boxOnMouseDown}>
          
          <div style={valueStyle}>{this.state.choice.label}</div>
          {arrow}
        </div>
        
        <div style={searchContainerStyle}>
          <div style={searchOutlineStyle}>
            <input className="remove-focus-outline" type="text" style={searchStyle} onChange={this.search} />
            <div style={glassStyle}>?</div>
          </div>
        </div>
        
        <div style={menuStyle}>
          {this.state.options.map(function(option) {
            return <Option key={option.value} option={option} onClick={this.handleSelect} onMouseEnter={this.onOptionMouseEnter} active={this.state.active == option} />;
          }.bind(this))}
          
          {this.showNoOptions()}
        </div>
      </div>
    );
  },
});
          // <i className={iconArrowClass} aria-hidden="true" style={arrowStyle}></i>

            // <input className="remove-focus-outline" type="text" style={searchStyle} onChange={this.search} ref="search" />
            // <i className="fa fa-search" aria-hidden="true" style={glassStyle}></i>