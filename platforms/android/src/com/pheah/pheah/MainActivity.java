/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.pheah.pheah;

import android.app.Dialog;
import android.app.DialogFragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity
{
	private DialogFragment dialog;

	@Override
    public void onCreate(Bundle savedInstanceState)
    {
	    /*showDialog();
	    new LoadViewTask().execute();*/
        super.onCreate(savedInstanceState);
		Log.d("com.pheah.pheah", "Starting Cordova...");
	    super.init();
	    loadUrl(launchUrl);
	    Log.d("com.pheah.pheah", "Loaded Cordova.");
    }

	/*private class LoadViewTask extends AsyncTask<Void, Integer, Void>
	{
		//Before running code in separate thread
		@Override
		protected void onPreExecute()
		{
			//showDialog();
		}

		//The code to be executed in a background thread.
		@Override
		protected Void doInBackground(Void... params)
		{
			*//* This is just a code that delays the thread execution 4 times,
			 * during 850 milliseconds and updates the current progress. This
			 * is where the code that is going to be executed on a background
			 * thread must be placed.
			 *//*
			try
			{
				//Get the current thread's token
				synchronized (this)
				{
					//Initialize an integer (that will act as a counter) to zero
					int counter = 0;
					//While the counter is smaller than four
					while(counter < 4)
					{
						//Wait 850 milliseconds
						this.wait(1000);
						//Increment the counter
						counter++;
					}
				}
			}
			catch (InterruptedException e)
			{
				e.printStackTrace();
			}
			return null;
		}

		//Update the progress
		@Override
		protected void onProgressUpdate(Integer... values) { }

		//after executing the code in the thread
		@Override
		protected void onPostExecute(Void result)
		{
			//close the progress dialog
			dialog.dismiss();
			*//*FragmentTransaction transaction = getFragmentManager().beginTransaction();
			transaction.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_CLOSE);
			transaction.remove(dialog).commit();*//*
		}
	}

	public void showDialog() {
		dialog = new LoadingDialogFragment();
		FragmentTransaction transaction = getFragmentManager().beginTransaction();
		// For a little polish, specify a transition animation
		transaction.setTransition(FragmentTransaction.TRANSIT_FRAGMENT_OPEN);
		// To make it fullscreen, use the 'content' root view as the container
		// for the fragment, which is always the root view for the activity
		transaction.add(android.R.id.content, dialog).commit();
		//transaction.add(dialog, "LoadingDialog").commit();
	}

	public static class LoadingDialogFragment extends DialogFragment {
		*//** The system calls this to get the DialogFragment's layout, regardless
		 of whether it's being displayed as a dialog or an embedded fragment. *//*
		@Override
		public View onCreateView(LayoutInflater inflater, ViewGroup container,
		                         Bundle savedInstanceState) {
			// Inflate the layout to use as dialog or embedded fragment
			return inflater.inflate(R.layout.splash, container, false);
		}

		*//** The system calls this only when creating the layout in a dialog. *//*
		@Override
		public Dialog onCreateDialog(Bundle savedInstanceState) {
			// The only reason you might override this method when using onCreateView() is
			// to modify any dialog characteristics. For example, the dialog includes a
			// title by default, but your custom layout might not need it. So here you can
			// remove the dialog title, but you must call the superclass to get the Dialog.
			Dialog dialog = super.onCreateDialog(savedInstanceState);
			dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
			return dialog;
		}
	}*/
}
