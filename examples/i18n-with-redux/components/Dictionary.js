import React from 'react';
import PropTypes from 'prop-types';
import IntlMessageFormat from 'intl-messageformat';
import { createComponent } from 'soya-next';
import dictionary from '../reducers/DictionaryReducer';
import { generateId } from '../utils/DictionaryUtil';
import { fetchTranslation } from '../actions/DictionaryAction';

class Dictionary extends React.Component {
  static propTypes = {
    component: PropTypes.any,
    renderProp: PropTypes.string,
    entryKey: PropTypes.string.isRequired,
    params: PropTypes.object,
    translation: PropTypes.string,
  };

  static defaultProps = {
    component: 'span',
    renderProp: 'children',
    params: null,
  };

  componentDidMount() {
    this.props.fetchTranslation();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.locale.language !== prevProps.locale.language ||
      this.props.locale.country !== prevProps.locale.country
    ) {
      this.props.fetchTranslation();
    }
  }

  render() {
    const {
      component: Component,
      renderProp,
      params,
      ...props,
    } = this.props;
    let translation = props.translation;
    delete props.entryKey;
    delete props.translation;
    delete props.defaultLocale;
    delete props.siteLocales;
    delete props.locale;
    delete props.cookies;
    delete props.fetchTranslation;

    if (translation) {
      try {
        translation = new IntlMessageFormat(translation).format(params);
      } catch (e) {
        // do nothing
      }
    }
    if (renderProp === 'dangerouslySetInnerHTML') {
      translation = { __html: translation };
    }
    props[renderProp] = translation;

    return (
      <Component {...props} />
    );
  }
}

const mapStateToProps = (state, props) => ({
  translation: state.dictionary[generateId(props)],
});

const mapDispatchToProps = (dispatch, props) => ({
  fetchTranslation() {
    dispatch(fetchTranslation(props));
  },
});

export default createComponent(mapStateToProps, mapDispatchToProps)(Dictionary, { dictionary });
