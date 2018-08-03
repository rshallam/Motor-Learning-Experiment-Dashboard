clear All;
clc;

for id = 1:300

    filename = strcat(pwd,'\','1_',num2str(id),'_TrialData.csv');
    M = csvread(filename,1,0);
    X = [M(:,1),M(:,2),M(:,3),M(:,4)];
    finalname = strcat('ts_01_0', num2str(id),'_withangles.csv');
    
    dlmwrite(finalname, X, 'delimiter', ',');
end
