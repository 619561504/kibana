/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toastNotifications } from 'ui/notify';
import copy from 'copy-to-clipboard';

import {
  EuiButton,
  EuiCodeEditor,
  EuiFlyoutBody,
  EuiFlyoutFooter,
  EuiFlyout,
  EuiTitle,
  EuiSpacer,
  EuiButtonEmpty,
  EuiPortal,
} from '@elastic/eui';
import { FormattedMessage, injectI18n } from '@kbn/i18n/react';


export class PolicyJsonFlyoutUi extends PureComponent {
  static propTypes = {
    close: PropTypes.func.isRequired,
    lifecycle: PropTypes.string.isRequired,
  };
  copyToClipboard(lifecycle) {
    const { intl } = this.props;
    copy(lifecycle);
    toastNotifications.add(intl.formatMessage({
      id: 'xpack.indexLifecycleMgmt.editPolicy.policyJsonFlyout.copiedToClipboardMessage',
      defaultMessage: 'JSON copied to clipboard',
    }));
  }
  render() {
    const { lifecycle, close, policyName } = this.props;

    return (
      <EuiPortal>
        <EuiFlyout maxWidth={400} ownFocus onClose={close}>
          <EuiFlyoutBody>
            <EuiTitle>
              <h2>
                <FormattedMessage
                  id="xpack.indexLifecycleMgmt.policyJsonFlyout.title"
                  defaultMessage="JSON for index lifecycle policy {policyName}"
                  values={{ policyName }}
                />
              </h2>
            </EuiTitle>
            <EuiSpacer size="s" />
            <EuiCodeEditor
              value={lifecycle}
              mode="javascript"
              theme="github"
              isReadOnly
            />
            <EuiSpacer size="s" />
            <EuiButton onClick={() => this.copyToClipboard(lifecycle)}>
              <FormattedMessage
                id="xpack.indexLifecycleMgmt.policyJsonFlyout.copyToClipboardButton"
                defaultMessage="Copy to clipboard"
              />
            </EuiButton>
          </EuiFlyoutBody>
          <EuiFlyoutFooter>
            <EuiButtonEmpty iconType="cross" onClick={close} flush="left">
              <FormattedMessage
                id="xpack.indexLifecycleMgmt.policyJsonFlyout.closeLabel"
                defaultMessage="Close"
              />
            </EuiButtonEmpty>
          </EuiFlyoutFooter>
        </EuiFlyout>
      </EuiPortal>
    );
  }
}
export const PolicyJsonFlyout = injectI18n(PolicyJsonFlyoutUi);

