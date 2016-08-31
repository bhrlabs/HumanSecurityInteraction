package com.asu.hsi.app;

public class Test {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

	
	public void checkExtrema(int[] arr, int i, int j) {
		if (i == 0) {
			if(arr[j] > arr[j+1]) {
				System.out.println("Local Minima");
			} else {
				System.out.println("Local Maxima");
			}
		}else if (j == arr.length-1) {
			if(arr[i] > arr[i-1]) {
				System.out.println("Local Minima");
			} else {
				System.out.println("Local Maxima");
			}
		} else {
			if (arr[i] < arr[i-1] && arr[j] < arr[j+1]) {
				System.out.println("Local Maxima");
			} else if (arr[i] > arr[i-1] && arr[j] > arr[j+1]) {
				System.out.println("Local Minima");
			}
		}
	}
}
