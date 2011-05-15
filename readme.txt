*DonkeyBuddy* is an extension for Google Chrome Browser. It's intended to make life easier when you add downloading tasks to MLDonkey.

= Features =

  # Users can choose how to interact with MLDonkey, either by AJAX or popup windows.
  # The AJAX mode interacts with MLDonkey by AJAX requests and uses desktop notifications to show the results, so it won't bother you by popping up windows and forcing you to close them.
  # The popup-window mode interacts MLDonkey by popping up a window and displays results in it, this is always a reliable way to add downloads but annoying.
  # An icon will be displayed in the location bar only when downloadable resources are found in the current tab, so it saves you the space in both toolbar and location bar.
  # Batch downloading.

= FAQ =

  # *Why a success notification pops up when I haven't even started MLDonkey ?*
    # Since the responses of the cross-domain AJAX requests have an empty message and a status which has the value 0, so I can't identify that whether they are successful or not.
    # But when MLDonkey is not running, AJAX requests always take more time to receive responses, so if a request has not received its reponse within a reasonable time, DonkeyBuddy will take it as a failure. So you should set the *AJAX timeout* option to a suitable value on your condition.
    # If you are still in trouble, use the popup-windows mode instead.
  # *Why a failure notification pops up when the downloading task has acturally been added ?*
    # Take a look at the upper question.
  # *How can I send the selected links to MLDonkey in one click ?*
    # Click on this extension's icon in the address bar.

= Change log =

*version 1.1.0 (2011-05-15 Sunday)*

  # Enable batch downloading for VeryCD.com.

----

*version 1.0.1 (2010-09-25 Saturday)*

  # Fix the problem that the image in the option page doesn't display as is expected.
  # Set the default value of the option *AJAX timeout* to 1000.

----

*version 1.0 (2010-09-24 Friday)*

Initial release.
