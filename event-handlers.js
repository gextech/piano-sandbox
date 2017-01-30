var log = console.log;

exports.access_granted = {
  new_purchase: log,
  payment_verified: log,
  free_promo_redemption: log,
  new_registration_conversion: log,
  free_access_granted: log
};

exports.access_modified = {
  subscription_updated: log,
  subscription_auto_renewed: log,
  subscription_manually_renewed: log,
  access_modified: log,
  grace_period_extension: log
};

exports.access_revoked = {
  access_revoked: log,
  subscription_auto_renewed_failure: log,
  subscription_canceled: log,
  subscription_expired: log,
  access_ended: log
};
